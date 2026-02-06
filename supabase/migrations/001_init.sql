-- Babaru Comic Hub Database Schema
-- Run this in Supabase SQL Editor to set up tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Comics table
CREATE TABLE IF NOT EXISTS comics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    tagline TEXT,
    status TEXT NOT NULL DEFAULT 'PLANNED' CHECK (status IN ('RELEASED', 'PRODUCTION', 'COMING_SOON', 'PLANNED')),
    thumbnail_url TEXT,
    video_url TEXT,
    duration INTEGER, -- in seconds
    genres TEXT[] DEFAULT '{}',
    rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    release_date DATE,
    production_note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comic rows (categories/sections)
CREATE TABLE IF NOT EXISTS comic_rows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    emoji TEXT NOT NULL DEFAULT '📺',
    subtitle TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Junction table for comics in rows
CREATE TABLE IF NOT EXISTS comic_row_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    row_id UUID REFERENCES comic_rows(id) ON DELETE CASCADE,
    comic_id UUID REFERENCES comics(id) ON DELETE CASCADE,
    "order" INTEGER NOT NULL DEFAULT 0,
    UNIQUE(row_id, comic_id)
);

-- Analytics events
CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type TEXT NOT NULL,
    comic_id UUID REFERENCES comics(id) ON DELETE SET NULL,
    user_id UUID, -- Anonymous ID or auth user ID
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assets registry (tracks uploaded files)
CREATE TABLE IF NOT EXISTS assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    bucket TEXT NOT NULL,
    path TEXT NOT NULL,
    public_url TEXT NOT NULL,
    mime_type TEXT,
    size_bytes BIGINT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(bucket, path)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_comics_status ON comics(status);
CREATE INDEX IF NOT EXISTS idx_comics_slug ON comics(slug);
CREATE INDEX IF NOT EXISTS idx_comic_rows_order ON comic_rows("order");
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_events(created_at DESC);

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER comics_updated_at
    BEFORE UPDATE ON comics
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- RLS Policies (open for MVP, tighten later)
ALTER TABLE comics ENABLE ROW LEVEL SECURITY;
ALTER TABLE comic_rows ENABLE ROW LEVEL SECURITY;
ALTER TABLE comic_row_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

-- Allow public read access to comics
CREATE POLICY "Comics are viewable by everyone" ON comics
    FOR SELECT USING (true);

CREATE POLICY "Comic rows are viewable by everyone" ON comic_rows
    FOR SELECT USING (true);

CREATE POLICY "Comic row items are viewable by everyone" ON comic_row_items
    FOR SELECT USING (true);

CREATE POLICY "Assets are viewable by everyone" ON assets
    FOR SELECT USING (true);

-- Allow anonymous analytics insertion
CREATE POLICY "Anyone can insert analytics" ON analytics_events
    FOR INSERT WITH CHECK (true);
