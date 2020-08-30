import React from 'react';

export const TeamCard = ({teamInfo}) => {
    console.log(teamInfo)
    return (
        <div className="m-5 rounded shadow bg-gray-800 text-white px-10">
           <span>{teamInfo.name}</span>
           <div>
               {/* Display recent results */}
           </div>
        </div>
    )
}