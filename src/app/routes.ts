/* 
export const routes: Routes = [
    {
      path: "",
      component: LayoutComponent,
      children: [
        { path: "", redirectTo: "home", pathMatch: "full" },
        {
          path: "home",
          loadChildren: () =>
            import("./home/home.module").then((m) => m.HomeModule),
        }, //canActivate: [AuthGuard]
        {
          path: "consecutivo",
          loadChildren: () =>
            import("./consecutive-fiscal/consecutive-fiscal.module").then(
              (m) => m.ConsecutivoFiscalModule
            ),
        },
      ],
    },
  
  
    // Not found
    { path: "**", redirectTo: "home" },
  ];
   */