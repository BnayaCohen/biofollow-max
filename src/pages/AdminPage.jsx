import { useEffect, useState } from 'react'
import Logo from '../assets/imgs/edited-logo.png'
import { userService } from '../services/user-service'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const initialState = {
  filterName: '',
  toggleShowModal: false,
  users: [],
  currUser: null,
  selectedDate: '',
}

function adminReducer(state, action) {
  switch (action.type) {
    case 'setFilterName':
      return { ...state, filterName: action.filterName }
    case 'setToggleShowModal':
      return { ...state, toggleShowModal: action.toggleShowModal }
    case 'setUsers':
      return { ...state, users: action.users }
    case 'setCurrUser':
      return { ...state, currUser: action.currUser }
    case 'setSelectedDate':
      return { ...state, selectedDate: action.selectedDate }
    default:
      return state
  }
}

export function AdminPage() {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  useEffect(() => {
    ; (async () => {
      const users = await userService.query({ txt: state.filterName })
      dispatch({ type: 'setUsers', users })
    })()
  }, [])

  useEffect(() => {
    ; (async () => {
      const allUsers = await userService.query({ txt: state.filterName })
      const users = allUsers.filter((user) => state.selectedDate === '' || new Date(user.createdAt).toLocaleDateString() === state.selectedDate.toLocaleDateString())
      dispatch({ type: 'setUsers', users })
    })()
  }, [state.selectedDate])

  const handleChange = async ({ target }) => {
    dispatch({ type: 'setFilterName', filterName: target.value })
    const users = await userService.query({ txt: target.value })
    dispatch({ type: 'setUsers', users })
  }

  const onRemoveUser = async (user) => {
    if (confirm('האם למחוק את ' + user.fullname)) {
      userService.removeUser(user._id)
      const users = await userService.query({ txt: state.filterName })
      dispatch({ type: 'setUsers', users })
    }
  }

  const onShowUser = (user) => {
    dispatch({ type: 'setCurrUser', currUser: user })
    dispatch({ type: 'setToggleShowModal', toggleShowModal: true })
  }

  return (<>
    <section className='admin-page flex column align-center'>
      <img src={Logo} className="logo" />

      <input className='filter-input input' value={state.filterName} onChange={handleChange} type="text" placeholder='חפש משתמש' />
      <div className='flex row align-center' style={{ gap: '6px', marginBottom: '15px' }}>
        <button onClick={() => dispatch({ type: 'setSelectedDate', selectedDate: '' })} className='user-btn' style={{ width: '-webkit-fill-available' }}>איפוס תאריך</button>
        <DatePicker className='date-picker' selected={state.selectedDate} onChange={(date) => dispatch({ type: 'setSelectedDate', selectedDate: date })} />
      </div>

      {state.users?.length ?
        <section className='user-list'>
          {state.users.map((user, i) =>
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
      {state.toggleShowModal ?
        <section className='modal-wrapper'>
          <div className='modal-content user-show-container'>
            <span className='close-btn' onClick={() => dispatch({ type: 'setToggleShowModal', toggleShowModal: false })}>X</span>
            <h2>{state.currUser.fullname}</h2>
            <div>{state.currUser.digits}</div>
            <h3>{new Date(state.currUser.createdAt).toLocaleTimeString('he-IL', { day: "numeric", month: "numeric", year: "numeric", hour: '2-digit', minute: '2-digit' })}</h3>
            <p>פעם: <span>{state.currUser.counter || '?'}</span> זמן: <span>{+state.currUser.times?.toFixed(1) || '?'}</span></p>

            <section className='flex space-around' style={{ gap: '40px', marginTop: '10px' }}>
              <div>
                {state.currUser.results[2].map((num, i) =>
                  <h3 key={i} className={`bg-${1 - i % 2}`}>
                    {num}
                  </h3>)}
              </div>
              <div>
                {state.currUser.results[1].map((num, i) =>
                  <h3 key={i} className={`bg-${i % 2}`}>
                    {num}
                  </h3>)}
              </div>
              <div>
                {state.currUser.results[0].map((num, i) =>
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