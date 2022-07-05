// Context Providers
import {
  AuthProvider,
  ProjectProvider,
  TagProvider,
  EstimationProvider,
  EstimationTypeProvider,
  ResultsProvider,
} from '../context'

export const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ProjectProvider>
        <TagProvider>
          <EstimationProvider>
            <ResultsProvider>
              {/* prettier-ignore */}
              <EstimationTypeProvider>
                {children}
            </EstimationTypeProvider>
            </ResultsProvider>
          </EstimationProvider>
        </TagProvider>
      </ProjectProvider>
    </AuthProvider>
  )
}
