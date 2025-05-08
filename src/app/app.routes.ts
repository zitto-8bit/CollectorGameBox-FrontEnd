import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/usuario/login/login.component';
import { RegistroComponent } from '../pages/usuario/registro/registro.component';
import { HomeComponent } from '../pages/home/home.component';
import { AuthGuard } from '../auth/auth.guard';
import { PerfilComponent } from '../pages/usuario/perfil/perfil.component';
import { GameDetailComponent } from '../pages/home/game/game-detail/game-detail.component';
import { AdminGameApprovalComponent } from '../pages/usuario/admin/admin-game-approval/admin-game-approval.component';
import { AuthAdminGuard } from '../auth/auth.admin.guard';
import { SugerirJogoComponent } from '../pages/usuario/admin/sugerir-jogo/sugerir-jogo.component';

const collectorGameBoxLabel: string = 'Collector Game Box'; 

export const routes: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    { path: 'home', redirectTo: '/inicio', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, title: 'Login - ' + collectorGameBoxLabel },
    { path: 'registro', component: RegistroComponent, title: 'Registro - ' + collectorGameBoxLabel },
    { path: 'inicio', component: HomeComponent, title: collectorGameBoxLabel },
    { path: 'perfil', component: PerfilComponent, title: 'Perfil - ' + collectorGameBoxLabel, canActivate: [AuthGuard] },
    { path: 'game/:name', component: GameDetailComponent, title: 'Detalhes - ' + collectorGameBoxLabel },
    { path: 'sugerir', component: SugerirJogoComponent, title: 'Sugestão - ' + collectorGameBoxLabel, canActivate: [AuthGuard] },
    { path: 'admin/jogos', component: AdminGameApprovalComponent, title: 'Aprovação - ' + collectorGameBoxLabel, canActivate: [AuthAdminGuard] }
];