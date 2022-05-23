import React from 'react';
/*import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from '@material-ui/icons';*/

import './user.css';

const User = () => {
  return (
    <>
      <div className='user'>
        <div className='userTitleContainer'>
          <h1 className='userTitle'>Update User</h1>
        </div>
        <div className='userContainer'>
          <div className='userUpdate'>
            <span className='userUpdateTitle'>Edit Detail</span>
            <form className='userUpdateForm'>
              <div className='userUpdateLeft'>
                <div className='userUpdateItem'>
                  <label>Username</label>
                  <input
                    type='text'
                    placeholder='annabeck99'
                    className='userUpdateInput'
                  />
                </div>

                <div className='userUpdateItem'>
                  <label>Email</label>
                  <input
                    type='text'
                    placeholder='annabeck99@gmail.com'
                    className='userUpdateInput'
                  />
                </div>
                <div className='userUpdateItem'>
                  <label>Phone</label>
                  <input
                    type='text'
                    placeholder='+1 123 456 67'
                    className='userUpdateInput'
                  />
                </div>
                <div className='userUpdateItem'>
                  <label>Paswword</label>
                  <input
                    type='password'
                    placeholder='Enter Password here'
                    className='userUpdateInput'
                  />
                </div>
                <button className='userUpdateButton'>Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
/*

  <div className='userUpdateUpload'>
                  <img
                    className='userUpdateImg'
                    src='https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
                    alt=''
                  />
                  <label htmlFor='file'>
                    <Publish className='userUpdateIcon' />
                  </label>
                  <input type='file' id='file' style={{ display: 'none' }} />
                </div>
 <div className='userUpdateRight'>
                <button className='userUpdateButton'>Update</button>
              </div>
*/
