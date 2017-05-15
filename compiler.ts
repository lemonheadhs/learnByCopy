class Compiler{}
interface Type<T>{}
class ComponentFactory<C>{}
class CompileNgModuleMetadata {
  transitiveModule = {
    modules: new Array<any>()
  }
  declaredDirectives: any[];
}
class CompileDirectiveMetadata {
  isComponent: boolean;
}
class CompileMetadataResolver{
  getNgModuleMetadata(mainModule: any) {
    return new CompileNgModuleMetadata();
  }
  getDirectiveMetadata(directiveType: any): CompileDirectiveMetadata {
    return new CompileDirectiveMetadata();
  }
}
class CompiledTemplate{}


class JitCompiler implements Compiler {
  constructor(
    private _metadataResolver: CompileMetadataResolver
  ) {}

  _compileComponents(mainModule: Type<any>, allComponentFactories: ComponentFactory<any>[]|null){
    const ngModule = this._metadataResolver.getNgModuleMetadata(mainModule) !;
    const moduleByDirective = new Map<any, CompileNgModuleMetadata>();
    const templates = new Set<CompiledTemplate>();

    ngModule.transitiveModule.modules.forEach((localModuleSummary) => {
      const localModuleMeta =
        this._metadataResolver.getNgModuleMetadata(localModuleSummary.reference) !;
      localModuleMeta.declaredDirectives.forEach((dirIdentifier) => {
        moduleByDirective.set(dirIdentifier.reference, localModuleMeta);
        const dirMeta = this._metadataResolver.getDirectiveMetadata(dirIdentifier.reference);
        if (dirMeta.isComponent) {
          templates.add(this._createCompiledTemplate(dirMeta, localModuleMeta));
        }
      })
    })
  }

  _createCompiledTemplate(dirMeta: CompileDirectiveMetadata, moduleMeta: CompileNgModuleMetadata): CompiledTemplate {
    return new CompiledTemplate();
  }
}




