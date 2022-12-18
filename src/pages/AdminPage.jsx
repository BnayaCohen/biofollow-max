import { useEffect, useState } from 'react'
import Logo from '../assets/imgs/edited-logo.png'
import { userService } from '../services/user-service'

export function AdminPage() {

  const [filterName, setFilterName] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    ; (async () => {
      setUsers(await userService.query({ txt: filterName }))
    })()
  }, [])

  const handleChange = ({ target }) => {
    setFilterName(target.value)
  }

  const onRemoveUser = async (user) => {
    if (confirm('האם למחוק את ' + user.fullname)){
       userService.removeUser(user._id)
       setUsers(await userService.query({ txt: filterName }))
      }
  }

  const onShowUser = (user) => {
    console.log(user);
  }

  return (<>
    <section className='admin-page flex column auto-center'>
      <img src={Logo} className="logo" />

      <input className='filter-input input' value={filterName} onChange={handleChange} type="text" placeholder='חפש משתמשים' />

      {users?.length ?
        <section className='user-list'>
          {users.map((user, i) =>
            <article key={i} className="user-preview flex space-between">
              <div className='user-actions'>
                <button className='remove-user-btn' onClick={() => onRemoveUser(user)}>הסר</button>
                <button className='show-user-btn' onClick={() => onShowUser(user)}>הצג</button>
              </div>
              <p>{user.fullname}</p>
            </article>)}
        </section>
        : null}

    </section>
  </>
  )
}