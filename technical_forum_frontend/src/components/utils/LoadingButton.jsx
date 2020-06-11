import React, { PureComponent } from 'react'
import { Button } from 'antd'
//邮箱验证码发送按钮
class LoadingButton extends PureComponent {
    buttonWidth = {
        width: '120px',
    }

    static defaultProps = {
        waitTime: 60,
        text: '再次发送',
    }

    constructor(props) {
        super(props)
        this.state = {
            count: this.props.waitTime,
            loading: false,
        }
    }

    buttonCallback = () => {
        this.props.onClick()
        this.setState({
            loading: true,
            count: this.props.waitTime,
        })
        const countChange = setInterval(() => {
            const { count } = this.state
            const newData = count
            this.setState({
                count: newData - 1,
            }, () => {
                if (this.state.count === 0) {
                    clearInterval(countChange)
                    this.setState({
                        loading: false,
                    })
                }
            })
        }, 1000)
    }

    render() {
        const { loading, count } = this.state
        const { text } = this.props
        return (
            loading ? <Button style={this.buttonWidth} disabled >({count}s)后再次发送</Button> : <Button style={this.buttonWidth} type="primary" onClick={this.buttonCallback}>{text}</Button>
        )
    }
}
export default LoadingButton