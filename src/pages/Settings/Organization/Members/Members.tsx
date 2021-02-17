import React from 'react'
import { Table, Button } from 'antd'
import { useSelector, useParams } from 'umi'

import { RootState, Project, User, Organization } from '@/interfaces'
import { Zone, User as UserComponent, Invite } from '@/components'
import { useAccess, useBoolean } from '@/hooks'
import { isAdmin } from '@/utils'

import styles from './Members.less'

const Members: React.FC = () => {
  // @ts-ignore
  const { organization_id } = useParams()
  const organization = useSelector<RootState, Organization>(
    (state) =>
      // eslint-disable-next-line eqeqeq
      state.organization?.data?.find((org) => org.id == organization_id)!
  )
  const projects = useSelector<RootState, Project[]>(
    // eslint-disable-next-line eqeqeq
    (state) =>
      state.organization?.data?.find((org) => org.id == organization_id)
        ?.projects!
  )
  const user = useSelector<RootState, User>((state) => state?.user?.current!)

  const [
    inviteVisible,
    { setTrue: inviteModalShow, setFalse: inviteModalOnCancel },
  ] = useBoolean(false)

  useAccess(isAdmin(organization?.admin?.id, user?.id))

  return (
    <section className={styles.root}>
      <Invite
        visible={inviteVisible}
        onCancel={inviteModalOnCancel}
        projects={projects}
        organization_id={organization_id}
        user={user}
      />
      <Zone
        title="成员列表"
        extra={
          isAdmin(organization?.admin?.id, user?.id) ? (
            <Button onClick={inviteModalShow}>邀请成员</Button>
          ) : null
        }
      >
        <Table<User>
          dataSource={organization.users}
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
              <span>
                {isAdmin(organization?.admin?.id, item?.id) ? '拥有者' : '成员'}
              </span>
            )}
          />
        </Table>
      </Zone>
    </section>
  )
}

export default Members
