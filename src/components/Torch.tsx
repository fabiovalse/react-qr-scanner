import React from 'react';

import TorchOffIcon from '../assets/TorchOffIcon';
import TorchOnIcon from '../assets/TorchOnIcon';

interface ITorchProps {
    scanning: boolean;
    status: boolean;
    torchToggle: (value: boolean) => void;
    style?: React.CSSProperties;
}

export default function Torch(props: ITorchProps) {
    const { status, style, scanning, torchToggle } = props;

    function toggleTorch(value: boolean) {
        torchToggle(value);
    }

    if (!scanning || !torchToggle) {
        return null;
    }

    return (
        <div style={{ bottom: 35, right: 8, position: 'absolute', zIndex: 2, cursor: 'pointer' }}>
            {status ? <TorchOffIcon onClick={() => toggleTorch(false)} style={style} /> : <TorchOnIcon onClick={() => toggleTorch(true)} style={style} />}
        </div>
    );
}
