import React, {Component} from 'react';
import changeCase from 'change-case';


/**
 * PostText component
 */
class PostText extends Component {

    constructor(props) {
        super(props);

        // component state
        this.state = {
            username: '',
        }
    }

    componentDidMount() {
        const userIdentifier = this.props.post.user_id;

        // load all categories from DB server via API
        this.props.getUserById(userIdentifier).then(res => {
            let username = this.state.username;

            if (res.data.user) {
                username = res.data.user.username;
                this.setState({username});
            }
        });
    }

    render() {

        const {id, text, created_at} = this.props.post;
        const {username} = this.state;

        let date = new Date(created_at);

        return (
        <div className="card card-block">
            <div className="row">
                <div className="col-xs-12">
                    {text}
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 text-xs-right">
                    <small>
                        <i className="fa fa-user">&nbsp;</i> {username} <i className="fa fa-calendar">&nbsp;</i> {date.toLocaleDateString('cs-CZ')} <i className="fa fa-clock-o">&nbsp;</i> {date.toLocaleTimeString('cs-CZ')}
                    </small>
                </div>
            </div>
        </div>
        );
    }

}

PostText.PropTypes = {
    post: React.PropTypes.object.isRequired,
    getUserById: React.PropTypes.func.isRequired,
};

export default PostText;