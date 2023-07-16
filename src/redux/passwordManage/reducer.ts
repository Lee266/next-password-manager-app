import { createSlice } from "@reduxjs/toolkit";
import { Password, PasswordGroup, PasswordTag } from "types/models/Password";

interface PasswordWithNonNullID extends Omit<Password, 'id'> {
  id: number;
}

type GetPassword = Omit<Password, '_id'> & { id: number };
type GetPasswordTag = Omit<PasswordTag, '_id'> & { id: number };
type GetPasswordGroup = Omit<PasswordGroup, '_id'> & { id: number };

interface passwordManageState {
  passwordDelete: boolean
  passwordUpdate: boolean
  passwordMove: boolean
  groupUpdate: boolean
  tagUpdate: boolean
  isLoading: boolean
  tableHeader: object
  passwordTitles: string[]
  passwords: GetPassword[],
  groups: GetPasswordGroup[]
  tags: GetPasswordTag[]
  selectedPassword: PasswordWithNonNullID | null;
  openAddDialog: boolean
  openDetailDialog: boolean
  openGroupDialog: boolean
  openTagDialog: boolean
  openSearchDialog: boolean
  openDeletePasswordDialog: boolean
  openDeleteGroupDialog: boolean
  openDeleteTagDialog: boolean
  openPlusButtonMenu: boolean
  openMinusButtonMenu: boolean
}

const initialState: passwordManageState = {
  passwordDelete: false,
  passwordUpdate: false,
  passwordMove: false,
  groupUpdate: true,
  tagUpdate: true,
  isLoading: false,
  tableHeader: ["title", ""],
  passwordTitles: [],
  passwords: [],
  groups: [],
  tags: [],
  selectedPassword: null,
  openAddDialog: false,
  openDetailDialog: false,
  openGroupDialog: false,
  openTagDialog: false,
  openSearchDialog: false,
  openDeletePasswordDialog: false,
  openDeleteGroupDialog: false,
  openDeleteTagDialog: false,
  openPlusButtonMenu: false,
  openMinusButtonMenu: false,
}

const passwordManageSlice = createSlice({
  name: 'passwordManage',
  initialState,
  reducers: {
    addPasswords: (state, action) => {state.passwords = action.payload},
    addGroups: (state, action) => {state.groups = action.payload},
    addTags: (state, action) => {state.tags = action.payload},
    openAddDialog: (state) => { state.openAddDialog = true; },
    closeAddDialog: (state) => { state.openAddDialog = false; },
    openDetailDialog: (state, action) => {
      state.openDetailDialog = true;
      state.selectedPassword = action.payload;
    },
    closeDetailDialog: (state) => {
      state.openDetailDialog = false;
      state.selectedPassword = null;
    },
    openGroupDialog: (state) => { state.openGroupDialog = true; },
    closeGroupDialog: (state) => { state.openGroupDialog = false; },
    openTagDialog: (state) => { state.openTagDialog = true; },
    closeTagDialog: (state) => { state.openTagDialog = false; },
    openSearchDialog: (state) => { state.openSearchDialog = true; },
    closeSearchDialog: (state) => { state.openSearchDialog = false; },
    openDeletePasswordDialog: (state) => { state.openDeletePasswordDialog = true; },
    closeDeletePasswordDialog: (state) => { state.openDeletePasswordDialog = false; },
    openDeleteTagDialog: (state) => { state.openDeleteTagDialog = true; },
    closeDeleteTagDialog: (state) => { state.openDeleteTagDialog = false; },
    openDeleteGroupDialog: (state) => { state.openDeleteGroupDialog = true; },
    closeDeleteGroupDialog: (state) => { state.openDeleteGroupDialog = false; },
    openPlusButtonMenu: (state) => {state.openPlusButtonMenu = true; },
    closePlusButtonMenu: (state) => {state.openPlusButtonMenu = false; },
    openMinusButtonMenu: (state) => {state.openMinusButtonMenu = true; },
    closeMinusButtonMenu: (state) => {state.openMinusButtonMenu = false; },
    deleteSelectedPassword: (state, action) => { state.passwordDelete = action.payload; },
    updateSelectedPassword: (state, action) => { state.passwordUpdate = action.payload; },
    movePassword: (state, action) => { state.passwordMove = action.payload; },
    changePasswords: (state, action) => { state.passwordUpdate = action.payload; },
    updateTag: (state, action) => { state.tagUpdate = action.payload; },
    updateGroup: (state, action) => { state.groupUpdate = action.payload; },
  }
})

export const { 
  addTags, addGroups, addPasswords,
  openAddDialog, closeAddDialog,
  openDetailDialog, closeDetailDialog, 
  openGroupDialog, closeGroupDialog,
  openTagDialog, closeTagDialog,
  openSearchDialog, closeSearchDialog,
  openDeletePasswordDialog, closeDeletePasswordDialog,
  openDeleteGroupDialog, closeDeleteGroupDialog,
  openDeleteTagDialog, closeDeleteTagDialog,
  openPlusButtonMenu, closePlusButtonMenu, 
  openMinusButtonMenu, closeMinusButtonMenu,
  deleteSelectedPassword, updateSelectedPassword, movePassword, updateTag, updateGroup, changePasswords,
} = passwordManageSlice.actions;

export default passwordManageSlice.reducer;
