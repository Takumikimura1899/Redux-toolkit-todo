/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface TaskState {
    // taskが何個あるのかを管理する
    idCount: number;
    //   storeに保存するtaskの一覧
    tasks: { id: number; title: string; completed: boolean }[];
    //   taskのtitleを編集する際にどのtaskが選択されているか
    selectedTask: { id: number; title: string; completed: boolean };
    //   Modalを開くか閉じるかのフラグ
    isModalOpen: boolean;
}

const initialState: TaskState = {
    idCount: 1,
    tasks: [{ id: 1, title: 'Task A', completed: false }],
    selectedTask: { id: 0, title: '', completed: false },
    isModalOpen: false,
};

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        // taskの作成
        createTask: (state, action) => {
            if (action.payload === undefined || action.payload === '') {
                console.log(action);
                return;
            }
            // countを１増やす
            state.idCount++;
            // 新しいtaskを宣言
            const newTask = {
                // 上で足された数
                id: state.idCount,
                //渡したaction.payloadつまり入力された文字
                title: action.payload,
                // チェックはfalse
                completed: false,
            };
            // 上で作成したnewTaskと元のstate.tasksを展開して結合して新しい一つの配列にする
            state.tasks = [newTask, ...state.tasks];
        },
        // taskの編集
        editTask: (state, action) => {
            // state.tasksの中から指定したtaskを抜き出す
            const task = state.tasks.find((t) => t.id === action.payload.id);
            if (task) {
                if (
                    action.payload.title === '' ||
                    action.payload.title === undefined
                ) {
                    return;
                }
                console.log(task.title);
                console.log(action.payload.title);

                //   抜き出したtaskのtitleを書き換える
                task.title = action.payload.title;
            }
        },
        // taskの削除
        deleteTask: (state, action) => {
            // 指定したtask以外で新しくstate.tasksの配列を作成しなおしている
            state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
        },
        // どのタスクを選択しているか管理
        selectTask: (state, action) => {
            state.selectedTask = action.payload;
        },
        // Modalを開くか閉じるかのフラグ管理
        handleModalOpen: (state, action) => {
            state.isModalOpen = action.payload;
        },
        // task完了・未完了のチェックを変更
        completeTask: (state, action) => {
            const task = state.tasks.find((t) => t.id === action.payload.id);
            if (task) {
                //   抜き出したtaskのcompletedを反転させる
                task.completed = !task.completed;
            }
        },
    },
});

export const {
    createTask,
    editTask,
    deleteTask,
    selectTask,
    handleModalOpen,
    completeTask,
} = taskSlice.actions;

export const selectTasks = (state: RootState): TaskState['tasks'] =>
    state.task.tasks;

export const selectIsModalOpen = (state: RootState): TaskState['isModalOpen'] =>
    state.task.isModalOpen;

export const selectSelectedTask = (
    state: RootState
): TaskState['selectedTask'] => state.task.selectedTask;

export default taskSlice.reducer;
