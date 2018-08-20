import http from '../../modules/http'

import { 
  CHANGE_USER_STATE 
} from './const'

const actionCreator = {
  get_initial_user_state (callback) {
    if ( !sessionStorage.user_state ) callback();
    let user_state = JSON.parse(sessionStorage.user_state || '{}')
    return { type:  CHANGE_USER_STATE, user_state}
},
  login ( { username, password, success, fail } ) {
    return dispatch => {
      http.ajax({
        url: '/api/login.json',
        params: { username, password }
      }).then(res => {
          console.log(res)
          let action = { type: CHANGE_USER_STATE,user_state: res }
          sessionStorage.user_state = JSON.stringify(res)
          dispatch( action )
          if(success) success()
      }).catch(err => {
        console.log(err)
        if(fail) fail()
      })
    }
  }
}

export default actionCreator 