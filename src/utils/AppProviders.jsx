// Context Providers
import {
  AuthProvider,
  ProjectProvider,
  TagProvider,
  EstimationProvider,
  EstimationTypeProvider,
} from '../context'

export const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ProjectProvider>
        <TagProvider>
          <EstimationProvider>
            {/* prettier-ignore */}
            <EstimationTypeProvider>
                {children}
            </EstimationTypeProvider>
          </EstimationProvider>
        </TagProvider>
      </ProjectProvider>
    </AuthProvider>
  )
}
