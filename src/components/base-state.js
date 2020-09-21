import React, { Fragment } from 'react';


const BaseState = ({stats}) => (
    <dl className="row pokemon-tab-info">
        {stats.map((stat, index) => {
            return (
                <Fragment key={index}>
                    <dd className="col-4 text-capitalize" >{stat.name}</dd>
                    <dt className="col-2 ">{stat.power}</dt>
                    <dd className="col-6 p-0 d-flex align-items-center">
                        <div className="progress-bar progressbar" style={{ width: stat.power + '%', backgroundColor: stat.power >= 50 ? '#6dcc93' : '#fb7777' }}></div>
                    </dd>
                </Fragment>
            )
        })}
    </dl>
)

export default BaseState;