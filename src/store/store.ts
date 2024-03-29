import {combineReducers, configureStore} from '@reduxjs/toolkit';
import employeesReducer from './reducers/EmployeesSlice'
import filterFormContentReducer from './reducers/FilterFormContentSlice';
import employeeByIdReducer from './reducers/EmployeeByIdSlice';
import applicationAppearanceReducer from './reducers/ApplicationAppearanceSlice';

const rootReducer = combineReducers({
    employeesReducer,
    filterFormContentReducer,
    employeeByIdReducer,
    applicationAppearanceReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']