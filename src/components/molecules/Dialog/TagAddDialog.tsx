import { useTranslation } from "next-i18next";
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { closeTagDialog, updateTag } from 'redux/passwordManage/reducer';
import { getUser } from 'api/users/crud';
import { createTag } from "api/password/tag";
import { getToken } from 'utils/auth';
import { PasswordTag, PasswordTagSchema } from 'types/models/Password';
import { Alert } from "redux/Feedback/types";
import { addAlert } from "redux/Feedback/reducer";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddButton from 'components/atoms/Button/AddButton';


const TagAddDialog = () => {
  const { t } = useTranslation();
  const token = getToken();
  const tags = useSelector((state: RootState) => state.passwordManage.tags);
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.passwordManage.openTagDialog);
  // react form settings
  const form = useForm<PasswordTag>({
    resolver: zodResolver(PasswordTagSchema),
    defaultValues: { user: -1, tag_name: ""}
  })
  const { register, handleSubmit, formState: { errors }, reset } = form;

  const handleClose = () => { 
    dispatch(closeTagDialog());
    reset();
  }

  const onSubmit: SubmitHandler<PasswordTag> = async(data) => {
    try { 
      const user = await getUser(token);
      data["user"] = user.id;
      await createTag(data, token);
      dispatch(updateTag(true));
      reset();
      handleClose();
    } catch (error) {
      const alert: Alert = {
        message: "グループが既に存在しているか、エラーが発生しました。",
        severity: "error",
      }
      dispatch(addAlert(alert));
    }
  }

  return(
    <div className="tag-add-dialog">
      <Dialog open={open} aria-labelledby="tag-add-dialog" onClose={() => handleClose()}>
        <DialogTitle id="password-tag-add-dialog">
          {t("Add Tag")}
          <IconButton aria-label="close" sx={{position: 'absolute',right: 8,top: 8,}} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <form id="tag-form" onSubmit={handleSubmit(onSubmit)} autoComplete='new-tag'>
          <DialogContent>
            <TextField 
              label="Tag name*"
              fullWidth
              {...register('tag_name')}
              error={!!errors.tag_name}
              helperText={errors.tag_name?.message}
            />
            <h2 className="mt-3">現在存在するタグ</h2>
            <div style={{ maxHeight: '8em', overflowY: 'auto', lineHeight: '1em' }}>
              {tags.map((tag, index) => {
                return(
                  <h3 className="mt-2" key={index}>{tag.tag_name}</h3>
                )
              })}
            </div>
          </DialogContent>
          <DialogActions>
            <AddButton name={t('add')} form='tag-form' type="submit" />
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default TagAddDialog;
