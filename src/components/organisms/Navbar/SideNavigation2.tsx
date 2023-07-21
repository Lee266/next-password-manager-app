import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/rootReducer";
import { toggleNavigation } from "redux/Common/reducer";
import Link from 'next/link';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import List  from '@mui/material/List';
import ListItemButton  from '@mui/material/ListItemButton';
import ListItemText  from '@mui/material/ListItemText';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';


const drawerWidth = 240;

const navItems = [
  ['index', ''],
  ['password', 'password-manage'],
  ['inquiry', 'inquiry'],
]

const SideNavigation2 = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.common.openNavigation);
  const sideBarPosition = useSelector((state: RootState) => state.common.sideBarPosition);

  return(
    <Box>
      <Drawer
        anchor={sideBarPosition}
        variant="temporary"
        open={open}
        onClose={() => dispatch(toggleNavigation())}
        ModalProps={{ keepMounted: true,}}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      > 
        {/* Back arrow icon  */}
        <div className='flex items-center'>
          <Fab onClick={() => dispatch(toggleNavigation())} className='ml-auto shadow-none'>
            <NavigateBeforeIcon 
              style={{ 
                transform: `${sideBarPosition === 'left' ? (open ? 'rotate(0deg)' : 'rotate(180deg)') : (open ? 'rotate(180deg)' : 'rotate(0deg)')}`, 
                transition: 'transform 0.3s' 
              }}/>
          </Fab>
        </div>
        <Divider/>
        {/* Menu items  */}
        <List sx={{paddingTop:"0px"}}>
          {navItems.map((item) => (
            <Link key={item[0]} href={"/"+item[1]} passHref>
              <ListItemButton 
                selected={router.asPath === ("/"+item[1])}
                sx={{color: router.asPath === ("/"+item[1]) ? 'accent' : 'inherit'}}
              >
                <ListItemText primary={t(`general.nav.${item[0]}`)}/>
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Drawer>
    </Box>
  )
}

export default SideNavigation2;
