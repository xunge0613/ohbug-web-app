import React from 'react';
import clsx from 'clsx';

import { useRect } from '@/hooks';
import type { Col, Row, TreeDataSource } from './Tree.interface';
import { TreeContext } from './Tree.context';
import Line from './Line';

import styles from './Tree.less';

export interface FlatDataSource {
  [key: string]: ({ parent: TreeDataSource<any>['key'] | null } & Omit<
    TreeDataSource<any>,
    'children'
  >)[];
}
export function expandDataSource(dataSource: TreeDataSource<any>) {
  const flatDataSource: FlatDataSource = {};

  function walk(node: TreeDataSource<any>, row: number, parent: TreeDataSource<any>['key'] | null) {
    const { key, value, children } = node;
    if (!flatDataSource[row]) flatDataSource[row] = [];
    flatDataSource[row].push({
      key,
      value,
      render: node.render,
      parent,
    });

    if (Array.isArray(children)) {
      children.forEach((child) => {
        walk(child, row + 1, key);
      });
    }
  }

  walk(dataSource, 0, null);

  return flatDataSource;
}

const nodeWidth = '200px';
const nodeSpace = '300px';
interface NodeWrapperProps {
  rowData: Row<any>;
  colData: Col<any>;
  top: string;
  left: string;
}
const NodeWrapper: React.FC<NodeWrapperProps> = ({ rowData, colData, top, left }) => {
  const { row, rowNumber } = rowData;
  const { col, colNumber } = colData;

  const [rect, ref] = useRect<HTMLDivElement>();
  const [parentRect, setParentRect] = React.useState();
  React.useLayoutEffect(() => {
    // 根据是否有 parent 判断是否为 head-node
    if (col.parent) {
      const parent: any = Array.from(
        document.querySelectorAll<HTMLDivElement>(`.${styles.node}[data-node-key]`),
      ).find((node) => {
        // eslint-disable-next-line
        return node.dataset.nodeKey == col.parent;
      });
      // 计算当前 node 的位置信息和 parent node 的位置信息
      if (parent) {
        setParentRect(parent?.getBoundingClientRect());
      }
    }
  }, [col.parent]);

  const {
    currentNode,
    handleSelectedNodeChange,
    selectedNodeClassName,
    nodeClassName,
    selectedLineClassName,
    lineClassName,
  } = React.useContext(TreeContext);
  const handleNodeClick = React.useCallback(() => {
    handleSelectedNodeChange(col.key);
  }, [col]);
  // eslint-disable-next-line eqeqeq
  const isCurrentNode = currentNode == col.key;
  const classes = React.useMemo(
    () =>
      clsx(styles.node, nodeClassName, {
        [selectedNodeClassName || '']: isCurrentNode,
      }),
    [selectedNodeClassName, currentNode, col.key],
  );

  return (
    <>
      <div
        className={classes}
        ref={ref}
        style={{ width: nodeWidth, top, left }}
        onClick={handleNodeClick}
        data-node-type="tree-node"
        data-node-key={col.key}
        data-node-id={`tree-${rowNumber}-${colNumber}`}
      >
        {col.render(
          col.value,
          {
            rowNumber,
            row,
          },
          {
            colNumber,
            col,
          },
        )}
      </div>
      {col.parent && (
        <Line
          className={clsx(lineClassName, { [selectedLineClassName || '']: isCurrentNode })}
          start={getPositionByRect('bottom', parentRect)}
          end={getPositionByRect('top', rect)}
        />
      )}
    </>
  );
};
export function render(flatDataSource: FlatDataSource) {
  return Object.keys(flatDataSource).map((rowNumber) => {
    const row = flatDataSource[rowNumber];
    return (
      <div className={styles.rowBox} key={rowNumber}>
        {row.map((col, index) => {
          const colNumber = index;

          const rowData: Row<any> = {
            row,
            rowNumber: parseInt(rowNumber, 10),
          };
          const colData: Col<any> = {
            col,
            colNumber,
          };
          const top = `calc(${nodeSpace} * ${rowNumber})`;
          const left = `calc(100% / ${row.length} * ${colNumber} + (100% / ${row.length} - ${nodeWidth}) / 2)`;
          return (
            <NodeWrapper key={col.key} rowData={rowData} colData={colData} top={top} left={left} />
          );
        })}
      </div>
    );
  });
}

type PositionType = 'top' | 'bottom';
interface GetPositionByRectResult {
  x?: number;
  y?: number;
}
export function getPositionByRect(type: PositionType, rect?: DOMRect): GetPositionByRectResult {
  if (rect) {
    const { x, y, width, height } = rect;
    switch (type) {
      case 'top':
        return {
          x: x + width / 2,
          y,
        };
      case 'bottom':
        return {
          x: x + width / 2,
          y: y + height,
        };
      default:
        return {
          x: undefined,
          y: undefined,
        };
    }
  }
  return {
    x: undefined,
    y: undefined,
  };
}
