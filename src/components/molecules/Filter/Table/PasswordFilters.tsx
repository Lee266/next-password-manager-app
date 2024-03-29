import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'next-i18next';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';
import {
  changePasswordFilters,
  closeMinusButtonMenu,
  closePlusButtonMenu,
  openAddDialog,
  openDeleteGroupDialog,
  openDeletePasswordDialog,
  openDeleteTagDialog,
  openGroupDialog,
  openMinusButtonMenu,
  openPlusButtonMenu,
  openSearchDialog,
  openTagDialog,
  resetPasswordFilters,
} from 'redux/passwordManage/reducer';
import SearchIcon from '@mui/icons-material/Search';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { RootState } from 'redux/rootReducer';
import { useSelector } from 'react-redux';
import CustomMenuItem from 'components/atoms/Menu/CustomMenuItem';
import CustomMenu from 'components/atoms/Menu/CustomMenu';

const PasswordFilters = () => {
  const { t } = useTranslation();
  const [anchorElAdd, setAnchorElAdd] = useState<null | HTMLElement>(null);
  const [anchorElDelete, setAnchorElDelete] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const openAdd = useSelector((state: RootState) => state.passwordManage.openPlusButtonMenu);
  const openDelete = useSelector((state: RootState) => state.passwordManage.openMinusButtonMenu);

  const handleClickAdd = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAdd(event.currentTarget);
    dispatch(openPlusButtonMenu());
  }, []);

  const handleClickDelete = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorElDelete(event.currentTarget);
    dispatch(openMinusButtonMenu());
  }, []);

  const handleCloseAdd = useCallback(() => {
    setAnchorElAdd(null);
    dispatch(closePlusButtonMenu());
  }, []);

  const handleCloseDelete = useCallback(() => {
    setAnchorElDelete(null);
    dispatch(closeMinusButtonMenu());
  }, []);

  const searchReset = () => {
    dispatch(resetPasswordFilters());
    dispatch(changePasswordFilters(true));
  };

  const openDialog = (dialogType: string) => {
    if (dialogType === 'group') {
      dispatch(openGroupDialog());
    } else if (dialogType === 'tag') {
      dispatch(openTagDialog());
    } else if (dialogType === 'deleteTag') {
    } else {
      dispatch(openAddDialog());
    }
  };

  return (
    <div className="password-filters mt-1">
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }} />
        {/* plus button  */}
        <Fab
          className="bg-primary dark:bg-primary-dark"
          size="small"
          color="primary"
          aria-label="add-password"
          onClick={handleClickAdd}
        >
          <AddIcon
            style={{
              transform: `${openAdd ? 'rotate(45deg)' : 'rotate(0deg)'}`,
              transition: 'transform 0.3s',
            }}
          />
        </Fab>
        <CustomMenu
          onClose={handleCloseAdd}
          anchorEl={anchorElAdd}
          open={openAdd}
          arrowPositionRight={15}
          paperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 10,
              },
            },
          }}
        >
          <CustomMenuItem onClick={() => openDialog('add')}>{t('component.menu.createPassword')}</CustomMenuItem>
          <CustomMenuItem onClick={() => openDialog('group')}>{t('component.menu.createGroup')}</CustomMenuItem>
          <CustomMenuItem onClick={() => openDialog('tag')}>{t('component.menu.createTag')}</CustomMenuItem>
        </CustomMenu>
        {/* minus button  */}
        <Fab
          className="bg-primary dark:bg-primary-dark"
          size="small"
          color="primary"
          aria-label="minus-button"
          onClick={handleClickDelete}
        >
          {openDelete ? (
            <AddIcon
              style={{
                transform: `rotate(45deg)`,
              }}
            />
          ) : (
            <RemoveIcon />
          )}
        </Fab>
        <CustomMenu
          onClose={handleCloseDelete}
          anchorEl={anchorElDelete}
          open={openDelete}
          arrowPositionRight={15}
          paperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 10,
              },
            },
          }}
        >
          <CustomMenuItem onClick={() => dispatch(openDeletePasswordDialog())}>
            {' '}
            {t('component.menu.deletePassword')}{' '}
          </CustomMenuItem>
          <CustomMenuItem onClick={() => dispatch(openDeleteGroupDialog())}>
            {' '}
            {t('component.menu.deleteGroup')}{' '}
          </CustomMenuItem>
          <CustomMenuItem onClick={() => dispatch(openDeleteTagDialog())}>
            {' '}
            {t('component.menu.deleteTag')}{' '}
          </CustomMenuItem>
        </CustomMenu>
        {/* search button  */}
        <Fab
          className="bg-primary dark:bg-primary-dark"
          size="small"
          color="primary"
          aria-label="search-button"
          onClick={() => dispatch(openSearchDialog())}
        >
          <SearchIcon />
        </Fab>
        {/* search reset button  */}
        <Fab
          className="bg-primary dark:bg-primary-dark"
          size="small"
          color="primary"
          aria-label="search-reset-button"
          onClick={searchReset}
        >
          <SearchOffIcon />
        </Fab>
      </Box>
    </div>
  );
};

export default PasswordFilters;
