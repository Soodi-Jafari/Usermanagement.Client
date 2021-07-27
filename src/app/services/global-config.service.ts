import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GlobalConfigService {
   public  apiUrl = 'http://localhost:65033';
}