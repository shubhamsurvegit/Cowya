import React from 'react'
import {Card} from '@material-ui/core'
const Centers = ({centers}) => {
    return (
        <div>
            <p>Centers</p>
            {centers.map((center)=>(
                <Card key={center.center_id} > 
                    <p key={center.center_id}>{center.name}</p>
                </Card>
            ))}
        </div>
    )
}

export default Centers
