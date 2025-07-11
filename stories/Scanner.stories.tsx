import React, { useState } from 'react';

import { action } from '@storybook/addon-actions';

import {
  boundingBox,
  centerText,
  IScannerProps,
  outline,
  Scanner as ScannerComp,
  useDevices
} from '../src';

const styles = {
    container: {
        width: '80%',
        maxWidth: 500,
        margin: 'auto'
    },
    controls: {
        marginBottom: 8
    }
};

function Template(args: IScannerProps) {
    const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
    const [tracker, setTracker] = useState<string | undefined>('centerText');

    const [pause, setPause] = useState(false);

    const devices = useDevices();

    function getTracker() {
        switch (tracker) {
            case 'outline':
                return outline;
            case 'boundingBox':
                return boundingBox;
            case 'centerText':
                return centerText;
            default:
                return undefined;
        }
    }

    return (
        <div style={styles.container}>
            <button style={{ marginBottom: 5 }} onClick={() => setPause((val) => !val)}>
                {pause ? 'Pause Off' : 'Pause On'}
            </button>
            <div style={styles.controls}>
                <select onChange={(e) => setDeviceId(e.target.value)}>
                    <option value={undefined}>Select a device</option>
                    {devices.map((device, index) => (
                        <option key={index} value={device.deviceId}>
                            {device.label}
                        </option>
                    ))}
                </select>
                <select style={{ marginLeft: 5 }} onChange={(e) => setTracker(e.target.value)}>
                    <option value="centerText">Center Text</option>
                    <option value="outline">Outline</option>
                    <option value="boundingBox">Bounding Box</option>
                    <option value={undefined}>No Tracker</option>
                </select>
            </div>
            <ScannerComp
                {...args}
                formats={[
                    'qr_code',
                    'micro_qr_code',
                    'rm_qr_code',
                    'maxi_code',
                    'pdf417',
                    'aztec',
                    'data_matrix',
                    'matrix_codes',
                    'dx_film_edge',
                    'databar',
                    'databar_expanded',
                    'codabar',
                    'code_39',
                    'code_93',
                    'code_128',
                    'ean_8',
                    'ean_13',
                    'itf',
                    'linear_codes',
                    'upc_a',
                    'upc_e'
                ]}
                constraints={{
                    deviceId: deviceId
                }}
                onScan={(detectedCodes) => {
                    action('onScan')(detectedCodes);
                }}
                onError={(error) => {
                    console.log(`onError: ${error}'`);
                }}
                components={{
                    onOff: true,
                    torch: true,
                    zoom: true,
                    finder: true,
                    tracker: getTracker()
                }}
                // sound={true}
                allowMultiple={true}
                scanDelay={2000}
                paused={pause}
            />
        </div>
    );
}

function CustomizedTemplate(args: IScannerProps) {
    const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
    const [tracker, setTracker] = useState<string | undefined>('centerText');

    const [pause, setPause] = useState(false);

    const devices = useDevices();

    function getTracker() {
        switch (tracker) {
            case 'outline':
                return outline;
            case 'boundingBox':
                return boundingBox;
            case 'centerText':
                return centerText;
            default:
                return undefined;
        }
    }

    const iconStyle = {
        padding: '2px',
        borderRadius: '8px',
        stroke: 'white',
        backgroundColor: '#7635DC'
    };

    return (
        <div style={styles.container}>
            <button style={{ marginBottom: 5 }} onClick={() => setPause((val) => !val)}>
                {pause ? 'Pause Off' : 'Pause On'}
            </button>
            <div style={styles.controls}>
                <select onChange={(e) => setDeviceId(e.target.value)}>
                    <option value={undefined}>Select a device</option>
                    {devices.map((device, index) => (
                        <option key={index} value={device.deviceId}>
                            {device.label}
                        </option>
                    ))}
                </select>
                <select style={{ marginLeft: 5 }} onChange={(e) => setTracker(e.target.value)}>
                    <option value="centerText">Center Text</option>
                    <option value="outline">Outline</option>
                    <option value="boundingBox">Bounding Box</option>
                    <option value={undefined}>No Tracker</option>
                </select>
            </div>
            <ScannerComp
                {...args}
                formats={[
                    'qr_code',
                    'micro_qr_code',
                    'rm_qr_code',
                    'maxi_code',
                    'pdf417',
                    'aztec',
                    'data_matrix',
                    'matrix_codes',
                    'dx_film_edge',
                    'databar',
                    'databar_expanded',
                    'codabar',
                    'code_39',
                    'code_93',
                    'code_128',
                    'ean_8',
                    'ean_13',
                    'itf',
                    'linear_codes',
                    'upc_a',
                    'upc_e'
                ]}
                constraints={{
                    deviceId: deviceId
                }}
                onScan={(detectedCodes) => {
                    action('onScan')(detectedCodes);
                }}
                onError={(error) => {
                    console.log(`onError: ${error}'`);
                }}
                components={{
                    onOff: true,
                    torch: true,
                    zoom: true,
                    finder: true,
                    tracker: getTracker()
                }}
                // sound={true}
                allowMultiple={true}
                scanDelay={2000}
                paused={pause}
                styles={{
                    borderBox: {
                        border: '2px dashed #7635DC'
                    },
                    corners: {
                        border: '4px solid #7635DC'
                    },
                    onOff: iconStyle,
                    torch: { ...iconStyle, fill: 'white' },
                    zoom: { ...iconStyle, fill: 'white' }
                }}
            />
        </div>
    );
}

export const Scanner = Template.bind({});
export const CustomizedScanner = CustomizedTemplate.bind({});

// @ts-ignore
Scanner.args = {};
CustomizedScanner.args = {};

export default {
    title: 'Scanner'
};
