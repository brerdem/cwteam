import React from 'react';
import Avatar from "@material-ui/core/es/Avatar/Avatar";

const UserAvatar = (props) => {

    if (!props.src || props.src === '') {
        return  <Avatar style={{backgroundColor: 'none'}} {...props}>{props.first_name.charAt(0).toLocaleUpperCase()+props.last_name.charAt(0).toLocaleUpperCase()}</Avatar>
    }
    return <Avatar {...props} />


};

export default UserAvatar;
