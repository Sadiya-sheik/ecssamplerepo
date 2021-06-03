import { Col } from 'antd';
import { Footer } from 'antd/lib/layout/layout';

import React from 'react';

const FooterMenu = () => {
    return ( 
        
            <Footer className="footer">
                {/* <Row className="hr-line"/> */}
                <hr/>
                <Col span={2}><small>Privacy</small></Col>
                <Col span={4}><small>Terms of use</small></Col>
                <Col span={10}></Col>
                <Col span={8}><small>&copy; 2021 ACERTUS All Rights Relenlessly Reserved</small></Col>    
            </Footer>
        
        
        
    );
}
export default FooterMenu