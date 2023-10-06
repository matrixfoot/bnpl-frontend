import { Injectable } from '@angular/core';
import { CanDeactivate} from '@angular/router';
import {ComponentCanDeactivate} from './component-can-deactivate';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate): boolean {
    if(!component.canDeactivate()){
        if (confirm("Veuillez vous assurer de la sauvegarde de toutes vos donnés avant de quitter la page")) {
            return true;
        } else {
            return false;
        }
    }
    return true;
  }
}