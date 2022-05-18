
export default function ({ store, redirect, route }) {
  const admin = store.getters['auth/isAdmin']
  if (!admin) {
    return redirect('/auth')
  }
}
