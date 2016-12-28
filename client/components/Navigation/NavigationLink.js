import React, {Component} from 'react';
import {Link} from 'react-router';

/**
 * NavigationLink component
 */
class NavigationLink extends Component {
    render() {
        let isActive = this.context.router.isActive(this.props.to, true);
        let className = isActive ? 'nav-item active' : 'nav-item';

        return(
            <li className={className}>
                <Link className="nav-link" {...this.props} />
            </li>
        )
    }
}

NavigationLink.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default NavigationLink;