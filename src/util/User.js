import axios from 'axios'

axios
  .get('https://codeforces.com/api/user.status?handle=Tourist')
  .then(res => {
    console.log(res)
  })
  .catch(err => console.log(err))