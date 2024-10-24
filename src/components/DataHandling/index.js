const DataHandling = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const teamValue = params.get('team');
    const nationValue = params.get('nation');
    const positionValue = params.get('position');

    let apiUrl = '';

    if (teamValue) {
      apiUrl = `https://premiere-league-gwg9dhe5h9f3fdas.uaenorth-01.azurewebsites.net/api/v1/player?team=${encodeURIComponent(teamValue)}`;
    } else if (nationValue) {
      apiUrl = `https://premiere-league-gwg9dhe5h9f3fdas.uaenorth-01.azurewebsites.net/api/v1/player?nation=${encodeURIComponent(nationValue)}`;
    } else if (positionValue) {
      apiUrl = `https://premiere-league-gwg9dhe5h9f3fdas.uaenorth-01.azurewebsites.net/api/v1/player?position=${encodeURIComponent(positionValue)}`;
    }

    if (apiUrl) {
      axios.get(apiUrl)
        .then(response => {
          setPlayerData(response.data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Age</th>
            <th>Matches Played</th>
            <th>Starts</th>
            <th>Minutes Played</th>
            <th>Goals</th>
            <th>Assists</th>
            <th>Nation</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {playerData.map(player => (
            <tr key={player.name}>
              <td>{player.name}</td>
              <td>{player.position}</td> 
              <td>{player.age}</td>
              <td>{player.matches_played}</td> 
              <td>{player.starts}</td>
              <td>{player.minutes_played}</td> 
              <td>{player.goals}</td> 
              <td>{player.assists}</td> 
              <td>{player.nation}</td>
              <td>{player.team_name}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataHandling;
