import React from 'react'
import { useDispatch, useParams, useSelector } from 'umi'
import { Button, Modal, Table } from 'antd'
import dayjs from 'dayjs'

import {
  RootState,
  Project,
  SourceMap,
  SourceMapModelState,
} from '@/interfaces'
import { Zone } from '@/components'
import { useMount } from '@/hooks'

import styles from './SourceMap.less'

const SourceMapCompnent: React.FC = () => {
  const dispatch = useDispatch()
  // @ts-ignore
  const { project_id } = useParams()

  const project = useSelector<RootState, Project>(
    // eslint-disable-next-line eqeqeq
    (state) => state?.project?.data?.find((pro) => pro.id == project_id)!
  )
  const dataSource = useSelector<RootState, SourceMapModelState['data']>(
    (state) => state.sourceMap?.data
  )
  const loading = useSelector<RootState, boolean>(
    (state) => state.loading.effects['sourceMap/get']!
  )

  useMount(() => {
    dispatch({
      type: 'sourceMap/get',
      payload: { project },
    })
  })

  return (
    <section className={styles.root}>
      <Zone title="SourceMap">
        <Table<SourceMap>
          dataSource={dataSource}
          loading={loading}
          rowKey={(record) => record.id!}
          pagination={false}
        >
          <Table.Column<SourceMap>
            title="文件名"
            render={(item) => (
              <span>
                {item?.data
                  ?.map(({ originalname }: any) => originalname)
                  .join(',')}
              </span>
            )}
          />
          <Table.Column<SourceMap>
            title="appVersion"
            render={(item) => <span>{item?.appVersion}</span>}
          />
          <Table.Column<SourceMap>
            title="appType"
            render={(item) => <span>{item?.appType}</span>}
          />
          <Table.Column<SourceMap>
            title="上传时间"
            render={(item) => (
              <span>
                {dayjs(item?.createdAt).format('YYYY-MM-DD HH:mm:ss')}
              </span>
            )}
          />
          <Table.Column<SourceMap>
            title="操作"
            render={(item) => (
              <span>
                <Button
                  className={styles.deleteButton}
                  type="text"
                  size="small"
                  onClick={() => {
                    Modal.confirm({
                      title: '请确认是否删除?',
                      okText: '删除',
                      okType: 'danger',
                      cancelText: '取消',
                      onOk() {
                        dispatch({
                          type: 'sourceMap/delete',
                          payload: {
                            sourceMap_id: item?.id,
                            project,
                          },
                        })
                      },
                    })
                  }}
                >
                  删除
                </Button>
              </span>
            )}
          />
        </Table>
      </Zone>
    </section>
  )
}

export default SourceMapCompnent
