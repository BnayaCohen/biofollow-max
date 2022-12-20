import { useEffect, useState } from 'react'
import Logo from '../assets/imgs/edited-logo.png'
import { userService } from '../services/user-service'

export function AdminPage() {

  const [filterName, setFilterName] = useState('')
  const [toggleShowModal, setToggleShowModal] = useState(false)
  const [users, setUsers] = useState([])
  const [currUser, setCurrUser] = useState(null)

  useEffect(() => {
    ; (async () => {
      setUsers(await userService.query({ txt: filterName }))
    })()
  }, [])

  const handleChange = ({ target }) => {
    setFilterName(target.value)
  }

  const onRemoveUser = async (user) => {
    if (confirm('האם למחוק את ' + user.fullname)) {
      userService.removeUser(user._id)
      setUsers(await userService.query({ txt: filterName }))
    }
  }

  const onShowUser = (user) => {
    console.log(user);
    setCurrUser(user)
    setToggleShowModal(true)
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
      {toggleShowModal ?
        <section className='modal-wrapper'>
          <div className='modal-content'>
            <h1 onClick={() => { setToggleShowModal(false) }}>X</h1>
            <h2>{currUser.fullname}</h2>
            <div>{currUser.digits}</div>
            <h3>{new Date(currUser.createdAt).toLocaleTimeString('he-IL', { day: "numeric", month: "numeric", year: "numeric", hour: '2-digit', minute: '2-digit' })}</h3>
            <section className='flex space-around' style={{ gap: '40px', marginTop: '20px' }}>
              <div>
                {currUser.results[2].map((num, i) =>
                  <article key={i}>
                    {num}
                  </article>)}
              </div>
              <div>
                {currUser.results[1].map((num, i) =>
                  <article key={i}>
                    {num}
                  </article>)}
              </div>
              <div>
                {currUser.results[0].map((num, i) =>
                  <article key={i}>
                    {num}
                  </article>)}
              </div>
            </section>
          </div>
        </section>
        : null}

    </section>
  </>
  )
}