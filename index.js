import React, { Component } from 'react';
import ReactDOM from 'react-dom';

let initialQuadrants = [
    {
        color: '#808D8E',
        num: 0,
        middleColor : '#87a6c1',
        middleNum : 0,
        innerColor : '#7A92F4',
        innerNum : 0,
    },
    {
        color: '#766C7F',
        num: 0,
        middleColor : '#AA74B2',
        middleNum : 0,
        innerColor : '#E567CC',
        innerNum : 0,

    },
    {
        color: '#947EB0',
        num: 0,
        middleColor : '#B41BE2',
        middleNum : 0,
        innerColor : '#FF00E5',
        innerNum : 0,
    },
    {
        color: '#A3A5C3',
        num: 0,
        middleColor : '#B49CF4',
        middleNum : 0,
        innerColor : '#C570FF',
        innerNum : 0,
    },
]

let quadRenderCounts = [0,0,0,0];
let midRenderCounts = [0,0,0,0];
let innerRenderCounts = [0,0,0,0];

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {quadrants: initialQuadrants};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(quadId, idx) {
        console.log(`mutating quad ${quadId}, ${idx}`);

        let quadrants = this.state.quadrants;
        quadrants[quadId][idx] = quadrants[quadId][idx] + 1;
        this.setState({quadrants});
    }

    render() {
        const { quadrants } = this.state;
        return (
            <div style={styles.container}>
                <Quadrant onClick={this.handleChange} quadId={0} {...quadrants[0]} />
                <Quadrant onClick={this.handleChange} quadId={1} {...quadrants[1]} />
                <Quadrant onClick={this.handleChange} quadId={2} {...quadrants[2]} />
                <Quadrant onClick={this.handleChange} quadId={3} {...quadrants[3]} />
            </div>
        );
    }
}

class Quadrant extends Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const { quadId } = this.props;
        this.props.onClick(quadId, 'num');
    }

    render() {
        const style = { ...styles.quadrant }
        const {
            quadId,
            color,
            middleColor,
            middleNum,
            innerColor,
            innerNum,
            onClick
        } = this.props;

        if (color) {
            style.backgroundColor = color;
        }

        return (
            <div style={style} onClick={this.handleClick}>
                <span style={{textAlign: 'center', paddingRight: '10px'}}>{++quadRenderCounts[quadId]}</span>
                <Middle
                    color={middleColor}
                    num={middleNum}
                    quadId={quadId}
                    innerColor={innerColor}
                    innerNum = {innerNum}
                    onClick = {onClick}
                />
            </div>
        );
    }
}

class Middle extends Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.stopPropagation();
        const { quadId } = this.props;
        this.props.onClick(quadId, 'middleNum');
    }

    render() {
        const style = {...styles.middle};
        const { color, quadId, innerColor, innerNum, onClick } = this.props;

        if (color) {
            style.backgroundColor = color;
        }

        return (
            <div style={style} onClick={this.handleClick}>
                <span style={{textAlign: 'center', paddingRight: '10px'}}>{++midRenderCounts[quadId]}</span>
                <Inner color={innerColor} num={innerNum} quadId={quadId} onClick={onClick} />
            </div>
        );
    }
}

class Inner extends Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.stopPropagation();
        const { quadId } = this.props;
        this.props.onClick(quadId, 'innerNum');
    }


    render() {
        const style = {...styles.inner};
        const { color, quadId, onClick } = this.props;

        if (color) {
            style.backgroundColor = color;
        }

        return (
            <div style={style} onClick={this.handleClick}>
                <span style={{textAlign: 'center', paddingRight: '10px'}}>{++innerRenderCounts[quadId]}</span>
            </div>
        );
    }
}

const styles = {
    container : {
        display : 'flex',
        flexWrap :  'wrap',
        height : '100%'
    },
    quadrant : {
        background : 'green',
        width : '50%',
        height : '50%',
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    },
    middle : {
        width : '80%',
        height : '80%',
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    },
    inner : {
        width : '70%',
        height : '70%',
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'

    }
}

ReactDOM.render(
    <App />,
    document.getElementById('example')
);
