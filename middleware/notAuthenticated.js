export default function ({ store, redirect }) {
  if (store.state.profile) {
    return redirect('/login')
  }
}