import axios from 'axios'

const contestList = () => {
  axios
  .get('https://codeforces.com/api/contest.list')
  .then(res => {
    //console.log(res.data.result);
    //contestlist = res.data.result;
    return res.data.result;
    //console.log(contestList);
  })
  .catch(err => console.log(err));

}



export default contestList;