import React from 'react';

const Rank = ({ user, rank }) => {
  return (
    <div>
      <div className='white f4'>
        <span>
          {`Welcome ${user.toUpperCase()}!`}
        </span><br></br>
        <span>
          {`Faces you have successfully detected are`}
        </span>
      </div>
      <div className='theme f2'>
        {rank}
      </div>
    </div>
  );
}

export default Rank;