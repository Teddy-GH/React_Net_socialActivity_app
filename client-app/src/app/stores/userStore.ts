import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";
import { useNavigate } from "react-router-dom";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  goToActivities = () => {
    const navigate = useNavigate();
    navigate("/activities");
  };

  goHome = () => {
    const navigate = useNavigate();
    navigate("/");
  };

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      // this.goToActivities();
      console.log(user);
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    let navigate = useNavigate();
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
    this.goHome();
  };


  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => this.user = user);
    } catch (error) {
      console.log(error);
    }
  }

  register =async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.register(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      // this.goToActivities();
      console.log(user);
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
    
  }

}
