import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const AlertComponent = ({ data }) => {
    const [show, setShow] = useState(data.show);
    function checkAlert(val) {
        setShow(val);
        data.show = val;
        data.variant = '';
        data.description = '';
    }
    return (
        <Alert variant={data.variant} onClose={() => checkAlert(false)} dismissible>
            <Alert.Heading className='mb-0'>{data.description}</Alert.Heading>
        </Alert>
    );

}

export default AlertComponent