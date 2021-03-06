import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICharacter } from './character';
import { IEmptyCharacter } from './emptycharacter';
import { IPlayer } from './player';

@Injectable({
  providedIn: 'root'
})
export class ControlPanelService {

  private controlURL="https://pillow-fight-game.azurewebsites.net/api/ControlPanel";
  private userId = parseInt(sessionStorage.getItem("userid")!);

  constructor(private http:HttpClient) { }

  getCharacters() : Observable<ICharacter[]>
  {
    return this.http.get<ICharacter[]>(this.controlURL + "/Characters?userId=" + this.userId);
  }

  getCharacter(characterId: number) : Observable<ICharacter>
  {
    return this.http.get<ICharacter>(this.controlURL + "/Character?userId=" + this.userId + 
                                    "&characterId=" + characterId);
  }

  getPlayers(numPlayer: number): Observable<IPlayer[]>
  {
    return this.http.get<IPlayer[]>(this.controlURL + "/LeaderBoard?n=" + numPlayer);
  }

  createCharacter(newCharacter: IEmptyCharacter): Observable<ICharacter>
  {
    // Create a blank character
    console.log("Attempting to create character");
    return this.http.post<ICharacter>(this.controlURL + "/CreateCharacter?userId=" + this.userId, {
      name: newCharacter.name,
      characterClass: newCharacter.characterClass
    });
  }

  deleteCharacter(characterId: number): Observable<boolean>
  {
    return this.http.get<boolean>(this.controlURL + "/DeleteCharacter?userId=" + this.userId + 
                    "&characterId=" + characterId);
  }

  equipCharacter(newCharacter: IEmptyCharacter): Observable<ICharacter>
  {
    console.log("Equipping Weapon");
    this.http.post<ICharacter>(this.controlURL + "/EquipCharacter?userId=" + this.userId + 
                  "&characterId=" + newCharacter.characterId + 
                  "&itemId=" + newCharacter.weaponId,
                  "");

    console.log("Equipping Armor");
    this.http.post<ICharacter>(this.controlURL + "/EquipCharacter?userId=" + this.userId + 
                  "&characterId=" + newCharacter.characterId + 
                  "&armorId=" + newCharacter.weaponId,
                  "");

    return this.getCharacter(newCharacter.characterId);
  }
}