import React from 'react'
import { Table, Button } from 'antd'
import { useSelector, useParams } from 'umi'

import { RootState, Project, User, Organization } from '@/interfaces'
import { Zone, User as UserComponent, InviteProject } from '@/components'
import { useBoolean } from '@/hooks'
import { isAdmin } from '@/utils'

import styles from './Members.less'

const Members: React.FC = () => {
  // @ts-ignore
  const { project_id, organization_id } = useParams()
  const project = useSelector<RootState, Project>(
    // eslint-disable-next-line eqeqeq
    (state) => state?.project?.data?.find((pro) => pro.id == project_id)!
  )
  const organization = useSelector<RootState, Organization>(
    // eslint-disable-next-line eqeqeq
    (state) =>
      state.organization?.data?.find((org) => org.id == organization_id)!
  )
  const user = useSelector<RootState, User>((state) => state?.user?.current!)
  const [
    inviteVisible,
    { setTrue: inviteModalShow, setFalse: inviteModalOnCancel },
  ] = useBoolean(false)

  return (
    <section className={styles.root}>
      <InviteProject
        visible={inviteVisible}
        onCancel={inviteModalOnCancel}
        project={project}
        organization={organization}
        user={user}
      />
      <Zone
        title="成员列表"
        extra={
          isAdmin(project?.admin?.id, user?.id) ? (
            <Button onClick={inviteModalShow}>邀请成员</Button>
          ) : null
        }
      >
        <Table<User>
          dataSource={project?.users}
          rowKey={(record) => record.id!}
          pagination={false}
        >
          <Table.Column<User>
            title="昵称"
            render={(item) => <UserComponent data={item} hasName />}
          />
          <Table.Column<User>
            title="邮箱"
            render={(item) => <span>{item?.email}</span>}
          />
          <Table.Column<User>
            title="手机号"
            render={(item) => <span>{item?.mobile}</span>}
          />
          <Table.Column<User>
            title="身份"
            render={(item) => (
              <span>{item?.id === project?.admin?.id ? '拥有者' : '成员'}</span>
            )}
          />
        </Table>
      </Zone>
    </section>
  )
}

export default Members
