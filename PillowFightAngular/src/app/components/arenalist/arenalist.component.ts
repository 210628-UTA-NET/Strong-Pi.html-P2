import { Component, OnInit, AfterViewChecked, HostListener, OnDestroy } from '@angular/core';
import { GameroomService } from 'src/app/shared/services/game/gameroom.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { IGameroom } from 'src/app/shared/services/game/Gameroom';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-arenalist',
  templateUrl: './arenalist.component.html',
  styleUrls: ['./arenalist.component.css']
})
export class ArenalistComponent implements OnInit {

  arenaname = new FormGroup({
    ArenaName: new FormControl("", [Validators.required])

  })
  arenas?:IGameroom[]= [];
  selectedArena?: IGameroom;
  joinable?:boolean = false;
  private arenasSub?:Subscription;
  private arenaSelectSub?:Subscription;
  listobserver={
    next:(x:any)=> {this.arenas=this.GameRoom.allrooms, console.log("arenalist component: list of rooms", this.arenas)},
    error:(err:any)=>console.log(err)
  }
  constructor(private GameRoom:GameroomService) { }

  ngOnInit(): void {
    const selectObserver={
      next:(x: any)=> {this.selectedArena=x; console.log(this.selectedArena)},
      error:(err: any)=> console.log(err)
    }

    this.GameRoom.SendAvailableRooms();
    this.arenasSub=this.GameRoom.rooms.subscribe(this.listobserver);
    this.arenaSelectSub=this.GameRoom.yourRoom.subscribe(selectObserver);
    console.log(this.selectedArena);
    console.log(this.arenas);
  }
  ngOnDestroy() {
    this.arenaSelectSub?.unsubscribe();
    this.arenasSub?.unsubscribe();
    console.log("Deleted");
  }

  addArena(f:FormGroup) {
    if(f.get("ArenaName")?.value==""){
        alert("Arena needs an Arena Name");
    }
    let name:string = f.get("ArenaName")?.value;
    this.GameRoom.SendNewRoomRequest(name);
  }

  loadArena(id: string) {
    this.GameRoom.SendJoinRoomRequest(id);
    this.joinable=this.GameRoom.canJoin;
    if (this.joinable==false){
      alert("You cannot join this room");
    }
  }

  refreshArenaList(){
    console.log("refreshing gameroom");
    this.arenas=this.GameRoom.allrooms;
    this.arenasSub?.unsubscribe();
    this.GameRoom.SendAvailableRooms();
    this.GameRoom.rooms.subscribe(this.listobserver)
    this.arenas=this.GameRoom.allrooms
  }
}
