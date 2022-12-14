import { useEffect, useState } from 'react'
import Logo from '../assets/imgs/edited-logo.png'
import { userService } from '../services/user-service'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function AdminPage() {

  const [filterName, setFilterName] = useState('')
  const [toggleShowModal, setToggleShowModal] = useState(false)
  const [users, setUsers] = useState([])
  const [currUser, setCurrUser] = useState(null)
  const [selectedDate, setselectedDate] = useState('');

  useEffect(() => {
    ; (async () => {
      setUsers(await userService.query({ txt: filterName }))
    })()
  }, [])

  useEffect(() => {
    ; (async () => {
      const usrs = await userService.query({ txt: filterName })
      setUsers(usrs.filter((user) => selectedDate === '' || new Date(user.createdAt).toLocaleDateString() === selectedDate.toLocaleDateString()))
    })()
  }, [selectedDate])

  const handleChange = async ({ target }) => {
    setFilterName(target.value)
    setUsers(await userService.query({ txt: target.value }))
  }

  const onRemoveUser = async (user) => {
    if (confirm('האם למחוק את ' + user.fullname)) {
      userService.removeUser(user._id)
      setUsers(await userService.query({ txt: filterName }))
    }
  }

  const onShowUser = (user) => {
    setCurrUser(user)
    setToggleShowModal(true)
  }

  return (<>
    <section className='admin-page flex column align-center'>
      <img src={Logo} className="logo" />

      <input className='filter-input input' value={filterName} onChange={handleChange} type="text" placeholder='חפש משתמש' />
      <div className='flex row align-center' style={{ gap: '6px', marginBottom: '15px' }}>
        <button onClick={() => setselectedDate('')} className='user-btn' style={{ width: '-webkit-fill-available' }}>איפוס תאריך</button>
        <DatePicker className='date-picker' selected={selectedDate} onChange={(date) => setselectedDate(date)} />
      </div>

      {users?.length ?
        <section className='user-list'>
          {users.map((user, i) =>
            <article key={i} className={`user-preview flex space-between align-center bg-${i % 2}`}>
              <div className='user-actions'>
                <button className='user-btn red' onClick={() => onRemoveUser(user)}>הסר</button>
                <button className='user-btn' onClick={() => onShowUser(user)}>הצג</button>
              </div>
              <p style={{ fontWeight: 500 }}>{new Date(user.createdAt).toLocaleTimeString('he-IL', { day: "numeric", month: "numeric", year: "numeric", hour: '2-digit', minute: '2-digit' })}</p>

              <div className='text-center'>
                <h1>{user.fullname}</h1>
                <p>{user.digits}</p>
                <p>פעם: <span>{user.counter || '?'}</span> זמן: <span>{+user.times?.toFixed(1) || '?'}</span></p>
              </div>
            </article>)}
        </section>
        : null}
      {toggleShowModal ?
        <section className='modal-wrapper'>
          <div className='modal-content user-show-container'>
            <span className='close-btn' onClick={() => { setToggleShowModal(false) }}>X</span>
            <h2>{currUser.fullname}</h2>
            <div>{currUser.digits}</div>
            <h3>{new Date(currUser.createdAt).toLocaleTimeString('he-IL', { day: "numeric", month: "numeric", year: "numeric", hour: '2-digit', minute: '2-digit' })}</h3>
            <p>פעם: <span>{currUser.counter || '?'}</span> זמן: <span>{+currUser.times?.toFixed(1) || '?'}</span></p>

            <section className='flex space-around' style={{ gap: '40px', marginTop: '10px' }}>
              <div>
                {currUser.results[2].map((num, i) =>
                  <h3 key={i} className={`bg-${1 - i % 2}`}>
                    {num}
                  </h3>)}
              </div>
              <div>
                {currUser.results[1].map((num, i) =>
                  <h3 key={i} className={`bg-${i % 2}`}>
                    {num}
                  </h3>)}
              </div>
              <div>
                {currUser.results[0].map((num, i) =>
                  <h3 key={i} className={`bg-${1 - i % 2}`}>
                    {num}
                  </h3>)}
              </div>
            </section>
          </div>
        </section>
        : null}

    </section>
  </>
  )
}