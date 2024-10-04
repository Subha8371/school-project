import React from 'react';
import { Carousel } from 'antd';
import Image from 'next/image';

const contentStyle = {
  margin: 0,
  height: '300px',
  color: '#fff',
  lineHeight: '300px',
  textAlign: 'center',
  background: '#364d79',
  margin:'30px'
};
const Carou = () => (
  <>
    
    <Carousel autoplay arrows dotPosition="left" infinite={false}>
    <div>
      <Image
            src="https://content.jdmagicbox.com/comp/midnapore/c2/9999p3222.3222.220131012355.e1c2/catalogue/satmile-high-school-satmile-midnapore-schools-7xKDQGUmOL.jpg"
            width={600}
            height={250}
            alt="Picture of the school"
            style={contentStyle}
            priority
          />
      
    </div>
    <div>
    <Image
            src=" https://content3.jdmagicbox.com/comp/midnapore/c2/9999p3222.3222.220131012355.e1c2/catalogue/satmile-high-school-satmile-midnapore-schools-TK3aVA0exS.jpg"
            width={600}
            height={250}
            alt="Picture of the school"
            style={contentStyle}
            priority
          />
    </div>
    <div>
    <Image
            src="https://scontent.fccu31-1.fna.fbcdn.net/v/t39.30808-6/322909061_740895280350553_7770079878391827697_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Pg4w68t5gjEQ7kNvgE9Pj_N&_nc_ht=scontent.fccu31-1.fna&_nc_gid=AVUUl8Fc5vsi30rVetF54J2&oh=00_AYAhCiEiuDWPpfhyzPv2ETq6_RL3DUYab6ymmbgG-lIGDw&oe=67044EC3"
            width={600}
            height={250}
            alt="Picture of the school"
            style={contentStyle}
            priority
          />
    </div>
    <div>
    <Image
            src="https://scontent.fccu31-1.fna.fbcdn.net/v/t39.30808-6/299857090_110400098447196_1645249257888786514_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Sy8I1PW0eQoQ7kNvgEWBfeQ&_nc_ht=scontent.fccu31-1.fna&_nc_gid=APF7rm1WA5R58J9JRAjZ_gp&oh=00_AYDVKnLdHdpLKhE8y6IgStvTyb-R9qKSBiL6_8Vg70Pdcg&oe=670478AA"
            width={600}
            height={250}
            alt="Picture of the school"
            style={contentStyle}
            priority
          />
          </div>
    </Carousel>
  </>
);
export default Carou;