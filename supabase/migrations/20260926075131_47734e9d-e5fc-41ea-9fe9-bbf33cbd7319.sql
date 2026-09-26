CREATE POLICY "Trusted service manages visitor access"
ON public.visitor_access
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Trusted service manages legacy profiles"
ON public.legacy_profiles
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);