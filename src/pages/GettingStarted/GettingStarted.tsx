import React from 'react'
import { useSelector } from 'umi'
import { Typography, Button } from 'antd'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { githubGist as highlighterStyles } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import type { ProjectModelState, RootState } from '@/interfaces'

import styles from './GettingStarted.less'

const GettingStarted: React.FC = () => {
  const project = useSelector<RootState, ProjectModelState['current']>(
    (state) => state.project.current
  )

  return (
    <div className={styles.root}>
      <Typography.Title level={2}>接入 Ohbug SDK</Typography.Title>

      <SyntaxHighlighter language="shell" style={highlighterStyles}>
        {`npm install @ohbug/browser --save
# or
yarn add @ohbug/browser`}
      </SyntaxHighlighter>

      <Typography.Text>
        紧接着在应用初始化的时候加载{' '}
        <Typography.Text code>Ohbug Browser SDK</Typography.Text>：
      </Typography.Text>

      <SyntaxHighlighter language="javascript" style={highlighterStyles}>
        {`import Ohbug from '@ohbug/browser'

Ohbug.init({ apiKey: '${project?.apiKey}' })`}
      </SyntaxHighlighter>

      <Button type="link" size="large" href="/issue?project_id=current">
        进入问题列表
      </Button>
    </div>
  )
}

export default GettingStarted
