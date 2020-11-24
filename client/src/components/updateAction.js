export default function updateAction(state, playload) {
  return{
    ...state,
    data:{
      ...state.data,
      ...playload
    }
  };
}