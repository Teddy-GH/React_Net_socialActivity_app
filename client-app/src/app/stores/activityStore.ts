import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
//   activities: Activity[] = [];
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingIntial = true;
  constructor() {
    makeAutoObservable(this);
  }

  // Sort activities by date
  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort((a, b) => 
    Date.parse(a.date) - Date.parse(b.date));
  }

  loadActivities = async () => {
    try {
      const activities = await agent.Activities.list();
      activities.forEach((actvity) => {
        actvity.date = actvity.date.split("T")[0];
        // activities.push(actvity);
        // replaced with map
        this.activityRegistry.set(actvity.id, actvity);
      });

      this.setLoadingIntial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingIntial(false);
    }
  };

  setLoadingIntial = (state: boolean) => {
    this.loadingIntial = state;
  };

  selectActivity = (id: string) => {
    // this.selectedActivity = this.activities.find((a) => a.id === id);
    // replaced fro the above code map
    this.selectedActivity = this.activityRegistry.get(id);
  };

  cancleSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancleSelectedActivity();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        //the below code replace array.push with map.set
        // this.activities.push(activity);
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        // this.activities = [
        //   ...this.activities.filter((a) => a.id !== activity.id),
        //   activity,
        // ];
         this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);

      runInAction(() => {
        // this.activities = [...this.activities.filter((a) => a.id !== id)];
        this.activityRegistry.delete(id);
        if (this.selectedActivity?.id === id) this.cancleSelectedActivity();
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
