import React from 'react';
import classnames from 'classnames';

export default class Alert extends React.Component {
    render() {
        const type = this.props.type || 'success';

        const classes = classnames(
            'alert',
            `alert-${type}`
        );

        return (
            this.props.message ? <div className={classes}>{this.props.message}</div> : null
        );
    }
}
