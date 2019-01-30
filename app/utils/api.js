import axios from 'axios';

const sec = "0ed88ae63debbd7669a13f851e6d58da10322d24";
const params = `?access_token=${ sec }`;

const getProfile = username => axios.get(
  `https://api.github.com/users/${ username }${ params }`
).then(
  user => user.data
);

const getRepos = username => axios.get(
  `https://api.github.com/users/${ username }/repos${ params }&per_page=100`
).then(
  user => user.data
);

const getStarCount = repos => repos.reduce(
  (count, repo) => count + repo.stargazers_count, 0
);

const calculateScore = ( profile, repos ) => ( profile.followers * 3 ) + getStarCount( repos );

const handleError = error => {
  console.warn( error );
  return null;
};

const getUserData = player => axios.all([
  getProfile( player ),
  getRepos( player ),
]).then( data => ({
  profile: data[0],
  score: calculateScore( data[0], data[1] ),
}));

const sortPlayers = players => players.sort( (a,b) => b.score - a.score );

export default {

  battle: players => axios
    .all( players.map( getUserData ) )
    .then( sortPlayers )
    .catch( handleError )
  ,

  fetchPopularRepos: language => {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

    return axios
      .get( encodedURI )
      .then( response => response.data.items );
  }
};
