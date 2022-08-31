import '../../main.css';
import './card.css';

function Card(props) {
  return (
    <a href={props.url} className='card' target={(props.url !== '/dashboard')?'_blank': ''} rel={(props.url !== '/dashboard')?'noreferrer': ''}>
        <img src={props.img} alt=''></img>
        <h3>{props.album}</h3>
        {
            (props.artists != null)
            ?
                <div className='card-text'>
                    {props.artists.map((name, i) => {
                        return <p key={i}>{name.name}</p>
                    })}
                </div>
            : <h3>{props.category}</h3>
        }
        
        
    </a>
  );
}

export default Card;
