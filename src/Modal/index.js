import React, {Fragment, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const OverlayStyle = styled.div`
    height:100%;
    max-width:100vw;
    background:rgba(0,0,0,0.2);
    display:flex;
    position:fixed;
    top:0;
    left:0;
    justify-content:center;
    align-items:center;
    z-index:${props => props.zindex ? props.zindex : 10000 };
    overflow: auto;
    padding: 20px;
    height: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
`;

const ModalStyle = styled.div`
    background:#FFFFFF;
    padding:20px;
    border-radius:4px solid;
    box-shadow:0 3px 6px #33333326;
    width:${props => props.width ? props.width: '500px'};   
    position: relative;
    max-height: none;
    margin: auto;
    overflow: visible;

   
`;

const appRoot = document.getElementById('root');

const App = ({visible,setVisible,children,width,zindex}) => {
    const Component = !visible ? null : (
        <Fragment>
            <OverlayStyle zindex={zindex} onClick={()=>{setVisible(false)}}>
                <ModalStyle width={width} onClick={e => e.stopPropagation()}>
                    {children}
                </ModalStyle>
            </OverlayStyle>
        </Fragment>
    );

    return ReactDOM.createPortal(Component, appRoot);

}


const useModal = (propVisible=false) => {
    const [visible, setVisible] = useState(propVisible);

    function toggleModal(b) {
        // let v = b !== undefined ? b : !visible;
        setVisible(!visible);
    }

    return [
        visible,
        toggleModal,
    ]
}

export default App;
export {useModal};
